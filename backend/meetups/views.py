from .serializer import TaskSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tasks
from .models import Users

# Create your views here.

@api_view(['GET'])
def get_data(request): 
    tasks_list=[]
    username=request.query_params.get("username")
    print(username)
    try:
        user_obj=Users.objects.get(username=username)
    except:
        print("I didnt Found this user ")

    obj=Tasks.objects.filter(user=user_obj.id)
    if username:
        for record in obj:
            tasks_list.append(record.task_name)
        
    return Response(tasks_list)


@api_view(['POST'])
def post_data(request):
    name = request.data.get("name")
    tasks = request.data.get("tasks", [])
    print(f"{name}  {tasks}")

    try:
        user_obj = Users.objects.get(username=name)  
    except Users.DoesNotExist:
        return Response({"error":f"User {name} Not Found"})

    #This is code for removing task
    current_tasks=[]
    for t in tasks:
        current_tasks.append(t)

    database_tasks=Tasks.objects.filter(user=user_obj.id)

    for db_task in database_tasks:
        if db_task.task_name not in current_tasks:
            db_task.delete()
    

    for t in tasks:
       
        if Tasks.objects.filter(user=user_obj.id, task_name=t).exists():
            continue 
        
        serializer = TaskSerializer(data={"user": user_obj.id, "task_name": t})

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=400)

    return Response({"message": f"Tasks saved for {name}"})

@api_view(['POST'])
def check_user(request):
    email=request.data.get("email")
    password=request.data.get("password")

    user=Users.objects.get(email=email)

    if user:
        username=user.username
    
    print(f"{user} and {type(user)}  ")

    if(user.password==password):
        return Response({"success":True,"username":username})
    else:
        return Response({"success":False})
