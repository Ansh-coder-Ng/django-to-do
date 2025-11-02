from django.urls import path
from . import views


urlpatterns=[
    path('get_data/',views.get_data),
    path('post_data/',views.post_data),
    path('validate_user/',views.check_user),
    path('add_user/',views.add_user)

]