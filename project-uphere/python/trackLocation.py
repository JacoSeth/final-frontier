from uphere import getSatLocation
import time

def satTracker(satNumber):
    x = satNumber
    for i in range(5):
        time.sleep(30)
        getSatLocation(x)
        time.sleep(30)
        i+=1
    # print('done')

satTracker(43226)