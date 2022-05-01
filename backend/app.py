from api import create_app
from api import db
app = create_app()

def Generate_stuff():
    with app.app_context():
        print ("yeet")
        _items = item.query.filter_by()
        _tasks = task.query.filter_by()
        print("fut")
        for _item in _items:
            has_task=False
            for _task in _tasks:
                if _task.item == _item.id:
                    has_task=True
            if  not has_task:
                task_name = "Auto_generated"
                task_priority = 0
                task_item = _item.id
                new_task=task(name=task_name,
                            priority=task_priority, 
                            item=task_item)
                db.session.add(new_task)
                db.session.commit()
                
if __name__ == '__main__':
    app.apscheduler.add_job(func = Generate_stuff,trigger='date',id='BackgroundTask')
    app.run(debug=False)
    

