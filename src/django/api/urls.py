from django.urls import path
from api import views

urlpatterns = [
    path('board/similar/<game_id>', views.similar),
    path('board/pesronalSimilar/<game_id>/<user_id>', views.pesronalSimilar),
    path('board/userSimilar/<user_id1>/<user_id2>', views.userSimilar),
    path('board/ratingRecommend', views.ratingRecommend)
]
