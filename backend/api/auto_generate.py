import threading
import time
from . import db
#from .model import 

class BackgroundTasks(threading.Thread):
    def run(self,*args,**kwargs):
        print ("thread start")
        i=1
        while True:
            time.sleep(5)
            print('Hello'+str(i))
            time.sleep(5)
            i+=1
