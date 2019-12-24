import matplotlib.pyplot as plt
import matplotlib.animation as animation
import requests
import json

# get all session data from the DB using the session_id
url = 'http://www.matthewjohncrossley.com/experiment_test/backend/getSessionData.php'
response = requests.post(url, {'session_id': '0'})
data = json.loads(response.text)

# log the configuration info
print("===============================================")
print("Config parameters associated with this session: ")
print("----------------------------------------------")
print(data["configInfo"])
print("===============================================")

# log the enviornment info
print("Environment used to run this session: ")
print("----------------------------------------------")
print(data["environmentInfo"])
print("===============================================")

# extract events and actions
begin_time = 0
trial_results, trial_inds = [], []
trial_ind = 0
event_names, event_times = [], []
action_names, action_times = [], []
for event in data["events"]:
  if event == None:
    continue
  if event["type"] == "trial_end":
    trial_ind += 1
    trial_results.append(event["status"])
    trial_inds.append(trial_ind)

  if event["type"] == "session_begin":
    begin_time = event["timestamp"]
    
  event_names.append(event["type"])
  event_times.append(event["timestamp"])

for action in data["actions"]:
  if action == None:
    continue
  action_names.append(action["type"])
  action_times.append(action["timestamp"])
  
  # if action["type"] == "click":
    # Here we can extract from "parameters"
    # the mouse X and Y positions 


# shift all timestamps by the begining timestamp 
# and divide by 1000 to transform to seconds
event_times = [(x - begin_time) / 1000 for x in event_times]
action_times = [(x - begin_time) / 1000 for x in action_times]

# plot all events and actions
fig = plt.figure(1, figsize=(10, 15))

chart_events = fig.add_subplot(311)
chart_events.scatter(event_times, event_names)
chart_events.set_ylabel('Event')

chart_actions = fig.add_subplot(312)
chart_actions.scatter(action_times, action_names)
chart_actions.set_ylabel('Action')
chart_actions.set_xlabel('Time (seconds)')

chart_results = fig.add_subplot(313)
chart_results.scatter(trial_inds, trial_results)

plt.show()