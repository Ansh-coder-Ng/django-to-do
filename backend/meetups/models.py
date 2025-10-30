from django.db import models

class Users(models.Model):
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=10)
    password=models.CharField(max_length=10)


class Tasks(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="tasks")
    task_name=models.CharField(max_length=10)


