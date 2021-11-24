from .models import Game
from rest_framework import serializers


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [
            "board_id",
            "image",
            "gamename",
            "yearpublished",
            "minplayers",
            "maxplayers",
            "minplaytime",
            "maxplaytime",
            "boardgamecategory",
        ]
