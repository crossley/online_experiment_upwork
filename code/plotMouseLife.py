import matplotlib.pyplot as plt
import matplotlib.animation as animation
import requests
import json

# get all session data from the DB using the session_id
url = 'http://www.matthewjohncrossley.com/experiment_test/backend/getSessionData.php'
response = requests.post(url, {'session_id': '0'})
data = json.loads(response.text)

# extract the mouse life data 
mouse_str = data['mouse_life']
mouse_sample_rate = data['configInfo']['mouse_position_capture_rate']
mouse_samples = (int)(len(mouse_str) / 4)

# reading mouse position at every given sample
def data_gen(s=0):
    while s < mouse_samples:
        x = (int)(mouse_str[s*4:s*4+2])
        y = (int)(mouse_str[s*4+2:s*4+4])
        s += 1
        yield x, y


def init():
    ax.set_ylim(0, 100)
    ax.set_xlim(0, 100)
    del xdata[:]
    del ydata[:]
    line.set_data(xdata, ydata)
    return line,

fig, ax = plt.subplots()
line, = ax.plot([], [], lw=2)
ax.grid()
xdata, ydata = [], []


def run(data):
    # update the data
    x, y = data
    xdata.append(x)
    ydata.append(y)

    line.set_data(xdata, ydata)

    return line,

ani = animation.FuncAnimation(fig, run, data_gen, blit=False, interval=mouse_sample_rate,
                              repeat=False, init_func=init)
plt.show()
