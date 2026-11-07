from django.urls import path
from .views import All_Characters, A_Character


urlpatterns = [
    path("", All_Characters.as_view(), name="all-characters"),
    path("<int:id>/", A_Character.as_view(), name="a-characters"),
]
