import csv
import pandas as pd
import numpy as np
from numpy.linalg import norm
from numpy import dot
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import mean_squared_error
from sklearn.feature_extraction.text import TfidfVectorizer
import os
import shutil
import re
from pandas import DataFrame
from .models import Review
from django.db import models
from django.db import connection
import math
import re
import random

DATA_DIR = "data"
DUMP_FILE = os.path.join(DATA_DIR, "review1000.pkl")

def load_dataframes2():
    return pd.read_pickle(DUMP_FILE)

def load_db_rating():
    data = load_dataframes2()
    data['rating'] = data['rating'].astype(float)

    humans = np.array(data)
    board_list = {}
    board_list['user'] = []
    board_list['board'] = []
    board_list['rating'] = []
    board_list['genre'] = []

    for a,b,c,d in humans:
        board_list['user'].append(b)
        board_list['board'].append(d)
        board_list['rating'].append(c)
        board_list['genre'].append(str(a))


    cursor = connection.cursor()
    cursor.execute('SELECT user_id, game_id, rating, genre FROM review, game WHERE review.game_id = game.original_id')
    for c in cursor:
        board_list['user'].append(c[0])
        board_list['board'].append(str(c[1]))
        board_list['rating'].append(c[2])
        board_list['genre'].append(c[3])

    return DataFrame(board_list)

def rating_list():
    board_list = {}
    board_list['user'] = []
    board_list['board'] = []
    board_list['rating'] = []

    cursor = connection.cursor()
    cursor.execute('SELECT user_id, game_id, rating FROM review')
    for c in cursor:
        board_list['user'].append(c[0])
        board_list['board'].append(c[1])
        board_list['rating'].append(c[2])

    return DataFrame(board_list)

# def load_board():
#     board_list = {}
#     board_list['id'] = []
#     board_list['board_id'] = []
#     board_list['boardgamecategory'] = []

#     cursor = connection.cursor()
#     cursor.execute('SELECT id, board_id, boardgamecategory FROM game')
#     for c in cursor:
#         board_list['id'].append(c[0])
#         board_list['board_id'].append(c[1])
#         board_list['boardgamecategory'].append(c[2])

#     return DataFrame(board_list)

def find_board(game_id):
    board = []
    cursor = connection.cursor()
    cursor.execute('SELECT id FROM game where board_id = ' + game_id)
    for c in cursor:
        return c[0]

def cos_sim(X,Y):
    return dot(X,Y)/((norm(X)*norm(Y))+1e-7)

def top_match_ar2(data, name, rank=5,simf=cos_sim):
    sim=[]
    # print(board.loc[0, 'board_id']==ratings['board'])
    for i in range(len(data)):
        if name != i:
            sim.append((simf(data[i],data[name]),i))
    sim.sort()
    sim.reverse()
    return sim[:rank]

def genre_recommend(ratings, game_id, size):
    # data = load_board()
    ratings['genre'] = ratings['genre'].apply(lambda x : re.split('\|', x))
    ratings['genre'] = ratings['genre'].apply(lambda x : ' '.join(x))
    # print(ratings)
    ratings["genre"].isnull().sum() #135
    ratings["genre"]=ratings["genre"].fillna('')
    ratings["genre"].isnull().sum() #0 으로 바뀜 내적하면 모두 0 나옴 
    tfidf=TfidfVectorizer(stop_words='english')#불용어 제거 
    tfidf_mat=tfidf.fit_transform(ratings["genre"]).toarray()
    boardList = []
    boardList.append(game_id)
    for sim, id in top_match_ar2(tfidf_mat,ratings.index[ratings['board'] == game_id].tolist()[0],size):
        # print(ratings.loc[id])
        boardList.append(ratings.loc[id, 'board'])

    return boardList

def rating_recommend():
    ratings = load_db_rating()
    copy_ratings = ratings.copy()
    mean_data = copy_ratings.groupby("board").mean()
    result = mean_data.sort_values(by="rating", ascending=False)[:50]
    board_list = []
    for c in result.index:
        board_list.append(c)
    board_dict = {'board' : board_list}
    return board_dict

def similar_recommend(game_id):
    ratings = load_db_rating()
    copy_ratings = ratings.copy()
    copy_ratings = copy_ratings.drop_duplicates(['board'], ignore_index = True)
    # print(copy_ratings.loc[10465, 'board'])    # 10466
    # print(copy_ratings)
    # print(copy_ratings.index[copy_ratings['board'] == '30549'].tolist()[0])
    if len(ratings[ratings['board']==game_id].index) < 3:
        data = genre_recommend(copy_ratings, copy_ratings.loc[random.randint(0, len(copy_ratings)), 'board'], 4)
        board_dict = {'board' : data}
        return board_dict

    data = genre_recommend(copy_ratings, game_id, 451)

    # print(data)
    # print(ratings['board'].isin(data))
    ratings = ratings[ratings['board'].isin(data)]
    # print(ratings)

    ratings_matrix = ratings.pivot_table('rating', index='user', columns='board')

    # fillna함수를 이용해 Nan처리
    ratings_matrix = ratings_matrix.fillna(0)

    ratings_matrix_T = ratings_matrix.transpose()

    # 아이템-유저 매트릭스로부터 코사인 유사도 구하기
    item_sim = cosine_similarity(ratings_matrix_T, ratings_matrix_T)

    # cosine_similarity()로 반환된 넘파이 행렬에 영화명을 매핑해 DataFrame으로 변환
    item_sim_df = pd.DataFrame(data=item_sim, index=ratings_matrix.columns, columns=ratings_matrix.columns)

    test = item_sim_df[game_id].sort_values(ascending=False)[1:6]
    # print(item_sim_df)
    board_list = []
    for c in test.index:
        board_list.append(c)
    board_dict = {'board' : board_list}
    return board_dict

#자신의 리뷰 보드는 가지고 있는 편이 좋겠음
def personal_recommend(game_id, user_id):
    ratings = load_db_rating()
    copy_ratings = ratings.copy()
    copy_ratings = copy_ratings.drop_duplicates(['board'], ignore_index = True)
        # print(copy_ratings)
        # print(copy_ratings.index[copy_ratings['board'] == '30549'].tolist()[0])
    if len(ratings[ratings['board']==game_id].index) < 3:
        data = genre_recommend(copy_ratings, copy_ratings.loc[random.randint(0, len(copy_ratings)), 'board'], 49)
        board_dict = {'board' : data}
        return board_dict
    data = genre_recommend(copy_ratings, game_id, 451)

        # print(data)
        # print(ratings['board'].isin(data))
    ratings = ratings[ratings['board'].isin(data)]

    ratings_matrix = ratings.pivot_table('rating', index='user', columns='board')

        # fillna함수를 이용해 Nan처리
    ratings_matrix = ratings_matrix.fillna(0)

    ratings_matrix_T = ratings_matrix.transpose()

        # 아이템-유저 매트릭스로부터 코사인 유사도 구하기
    item_sim = cosine_similarity(ratings_matrix_T, ratings_matrix_T)

        # cosine_similarity()로 반환된 넘파이 행렬에 영화명을 매핑해 DataFrame으로 변환
    item_sim_df = pd.DataFrame(data=item_sim, index=ratings_matrix.columns, columns=ratings_matrix.columns)

    board_list = []
    
    if (ratings['user']==user_id).any():
        ratings_pred = predict_rating(ratings_matrix.values, item_sim_df.values)
        ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=ratings_matrix.index, columns = ratings_matrix.columns)
        not_tried = get_not_tried_beer(ratings_matrix, user_id)
        # print(not_tried)
        recomm_beer = recomm_beer_by_userid(ratings_pred_matrix, user_id, not_tried, top_n=50)
        recomm_beer = pd.DataFrame(data=recomm_beer.values, index=recomm_beer.index, columns=['예측평점'])

        for i in range(50):
            board_list.append(recomm_beer.index[i])
    else:
        test = item_sim_df[game_id].sort_values(ascending=False)[1:51]
        # print(item_sim_df)
        for c in test.index:
            board_list.append(c)
    board_dict = {'board' : board_list}
    return board_dict

def predict_rating(ratings_arr, item_sim_arr):
    ratings_pred = ratings_arr.dot(item_sim_arr) / np.array([np.abs(item_sim_arr).sum(axis=1)])
    return ratings_pred

def get_mse(pred, actual):
    pred = pred[actual.nonzero()].flatten()
    actual = actual[actual.nonzero()].flatten()
    return mean_squared_error(pred, actual)

def get_not_tried_beer(ratings_matrix, userId):
    # userId로 입력받은 사용자의 모든 맥주 정보를 추출해 Series로 반환
    # 반환된 user_rating은 영화명(title)을 인덱스로 가지는 Series 객체
    user_rating = ratings_matrix.loc[userId, :]

    # user_rating이 0보다 크면 기존에 관란함 영화.
    # 대상 인덱스를 추출해 list 객체로 만듦
    tried = user_rating[user_rating>0].index.tolist()

    # 모든 맥주명을 list 객체로 만듦
    beer_list = ratings_matrix.columns.tolist()

    # list comprehension으로 tried에 해당하는 영화는 beer_list에서 제외
    not_tried = [beer for beer in beer_list if beer not in tried]

    return not_tried

def recomm_beer_by_userid(pred_df, userId, not_tried, top_n):
    recomm_beer = pred_df.loc[userId, not_tried].sort_values(ascending=False)[:top_n]
    return recomm_beer

def user_recommend(user1, user2):
    human = rating_list()
    if len(human) == 0:
        simUser = {'userSimilar' : 0}
    else:
        if (human['user']==user1).any() and (human['user']==user2).any():
            humans = np.array(human)
            ratings = {user:{} for user in human['user']}
            for a,b,c in humans:
                ratings[a][b] = c

            simUser = {'userSimilar' : int(sim_distance(ratings, user1, user2) * 100)}
        else:
            simUser = {'userSimilar' : 0}

    return simUser


def sim_distance(data, name1, name2):
    sum=0
    for i in data[name1]:
        if i in data[name2]: 
            sum+=pow(data[name1][i]- data[name2][i],2)
        
    return 1/(1+math.sqrt(sum))
