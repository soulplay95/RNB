from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import Recommend
from .models import Game, User
# from .serializers import StoreSerializer

from django.db import connection

@api_view(['GET'])
def similar(request, game_id):
    return Response(Recommend.similar_recommend(game_id))

@api_view(['GET'])
def pesronalSimilar(request, game_id, user_id):
    return Response(Recommend.personal_recommend(game_id,user_id))

@api_view(['GET'])
def userSimilar(request, user_id1, user_id2):
    return Response(Recommend.user_recommend(user_id1, user_id2))

@api_view(['GET'])
def ratingRecommend(request):
    return Response(Recommend.rating_recommend())   
