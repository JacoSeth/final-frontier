from uphere import getSatLocation
import time

# Need a new API to get the info I need. Other api too expensive to keep running w/o using

def satTracker(satNumber):
    x = satNumber
    for i in range(5):
        time.sleep(30)
        getSatLocation(x)
        time.sleep(30)
        i+=1
    # print('done')

satTracker(43226)