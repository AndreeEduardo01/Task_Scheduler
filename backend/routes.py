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
        time_end_estimated= data['time_end_estimated']
    )
    print(type(new_scheduled_task))

    db.session.add(new_scheduled_task)
    db.session.commit()

    return jsonify({'message': 'Task scheduled successfully!'}), 201
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