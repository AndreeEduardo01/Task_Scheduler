# routes.py
from flask import Blueprint, jsonify, request
from models import db, Task,Scheduled,Users

tasks_bp = Blueprint('tasks_bp', __name__)

@tasks_bp.route('/schedule', methods=['POST'])
def schedule_task():
    data = request.json
    new_scheduled_task = Scheduled(
        id_task=data['id_task'],
        time_init=data['time_init'],
        duration_estimated=data['duration_estimated'],
        assigned_to=data['assigned_to'],
        assigned_by=1,  # Puedes obtener el ID del usuario actual si es necesario
        time_end_estimated= data['time_end_estimated'])
    print(type(new_scheduled_task))

    db.session.add(new_scheduled_task)
    db.session.commit()

    return jsonify({'message': 'Task scheduled successfully!'}), 201

@tasks_bp.route('/scheduled', methods=['GET'])
def get_schedules():
    start = request.args.get('start')
    end = request.args.get('end')

    schedules = Scheduled.query.join(Task,Scheduled.id_task == Task.id_task).filter(Scheduled.time_init.between(start,end)).all()
    
    return jsonify([{
        'id_scheduled': s.id_scheduled,
        'id_task': s.id_task,
        'time_init':s.time_init,
        'duration_estimated' : s.duration_estimated,
        'duration_real' : s.duration_real,
        'time_end_estimated' : s.time_end_estimated,
        'time_end_real' : s.time_end_real,
        'assigned_by' : s.assigned_by,
        'assigned_to' : s.assigned_to
        # 'description':Task.description
        # 'assigned_by_user' : s.assigned_by_user
        # 'assigned_to_user' : s.assigned_to_user
    } for s in schedules])

# Endpoint para obtener todos los usuarios
@tasks_bp.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()
    return jsonify([
        {
            'id_user': user.id_user,
            'name_user': user.name_user,
            'lastname_user': user.lastname_user
        } for user in users
    ])


@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([
        {
            'id_task': task.id_task,
            'id_kindoftask': task.id_kindoftask,
            'description': task.description,
            'created_by': task.created_by
        } for task in tasks
    ])

@tasks_bp.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    if not all(key in data for key in ('id_kindoftask', 'description', 'created_by')):
        return jsonify({'error': 'Missing data'}), 400

    new_task = Task(
        id_kindoftask=data['id_kindoftask'],
        description=data['description'],
        created_by=data['created_by']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added', 'id_task': new_task.id_task}), 201

@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})