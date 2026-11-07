from django.shortcuts import render

# Create your views here.
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

from .models import User
from .serializers import UserSerializer

class Sign_Up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get('username', request.data.get('email'))
        data['is_staff'] = False
        data['is_active'] = True

        try:
            new_user = User.objects.create_user(**data) # make further changes on data to make sure that abstract user class fields are not unintentionally wrong
            token = Token.objects.create(user=new_user)
            return Response({'user': new_user.email, 'token':token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': e.message_dict}, status=HTTP_400_BAD_REQUEST)
        
class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get('username', request.data.get('email'))

        user = authenticate(username=data.get('username'), password=data.get('password'))

        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user': user.email, 'token': token.key}, status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        
class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
    
class Info(TokenReq):
    def get(self, request):
        user_info = UserSerializer(request.user, partial=True)
        return Response(user_info.data, status=HTTP_200_OK)
    
    def put(self, request):
        data = request.data.copy()

        new_password = data.pop('new_password', None)
        old_password = data.pop('old_password', None)

        if new_password and old_password:
            if not request.user.check_password(old_password):
                return Response({"error": "Old password is incorrect."}, status=HTTP_400_BAD_REQUEST)
            request.user.set_password(new_password)
            request.user.save()
            update_session_auth_hash(request, request.user)
            return Response("Password changed", HTTP_200_OK)

        new_user_info = UserSerializer(request.user, data=data, partial=True)
        if new_user_info.is_valid():
            new_user_info.save()
            return Response(new_user_info.data, status=HTTP_200_OK)
        else:
            return Response(new_user_info.errors, status=HTTP_400_BAD_REQUEST)