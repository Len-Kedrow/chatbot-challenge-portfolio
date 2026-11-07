from  django.urls import path
from .views import GameState, GameTurn

urlpatterns = [
    #path("<int:game_id/>", CurrentGame.as_view(), name = 'this-game'),

    path("game-state/", GameState.as_view(), name = 'game-state'),
    path("game-state/<int:game_id>/", GameState.as_view(), name = 'a_game-state'),
    path("game-turn/<int:game_id>/", GameTurn.as_view(), name='game-turn'),
    
]
