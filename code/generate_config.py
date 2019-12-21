import os
import sys
from copy import deepcopy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from utils import *

# NOTE: Define category distributions
n_targets = 1
n_trials = 150
n = 5
n_positions = 5

n_stim_per_rep = (2 * n)
n_reps = n_trials // n_stim_per_rep

x1 = -15 * np.ones(n)
x2 = 15 * np.ones(n)
y = np.linspace(-50, 50, n)
y1 = y
y2 = y

xd = np.zeros(n - 1)
yd = y[0:-1] + np.unique(np.diff(y))[0] / 2
xyd = np.array((xd, yd)).T

xy_1 = np.array((x1, y1)).T
xy_2 = np.array((x2, y2)).T

# NOTE: Rotate
theta = 45.0 * np.pi / 180.0
rot_mat = np.array([[np.cos(theta), -np.sin(theta)],
                    [np.sin(theta), np.cos(theta)]])

xy_1_rot = deepcopy(xy_1)
xy_2_rot = deepcopy(xy_2)
xyd_rot = deepcopy(xyd)
xy_1_rot = np.matmul(xy_1_rot, rot_mat)
xy_2_rot = np.matmul(xy_2_rot, rot_mat)
xyd_rot = np.matmul(xyd_rot, rot_mat)
xy_1_rot += 50.0
xy_2_rot += 50.0
xyd_rot += 50.0

x1_rot = xy_1_rot[:, 0]
y1_rot = xy_1_rot[:, 1]
x2_rot = xy_2_rot[:, 0]
y2_rot = xy_2_rot[:, 1]
xd_rot = xyd_rot[:, 0]
yd_rot = xyd_rot[:, 1]

# NOTE: Transform stimuli to physical units
x1_rot_t, y1_rot_t = TransformStim(x1_rot, y1_rot)
x2_rot_t, y2_rot_t = TransformStim(x2_rot, y2_rot)
xd_rot_t, yd_rot_t = TransformStim(xd_rot, yd_rot)

# NOTE: plot category distributions
fig = plt.figure(figsize=(5, 5))
ax = fig.gca()
ax.plot(x1_rot, y1_rot, 'r.')
ax.plot(x2_rot, y2_rot, 'b.')
ax.plot(xd_rot, yd_rot, 'kx')
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
plt.show()

# NOTE: save stim for online experiment
x = np.concatenate((x1_rot_t, x2_rot_t, xd_rot_t))
y = np.concatenate((y1_rot_t, y2_rot_t, yd_rot_t))
cat = np.concatenate((np.ones(n, dtype=np.int8), 2 * np.ones(n, dtype=np.int8),
                      -1 * np.ones(n - 1, dtype=np.int8)))
stim_key = {'id': [], 'x': [], 'y': [], 'cat': [], 'contrast': []}

contrast = np.linspace(0.2, 1, 5)

for i in range(contrast.shape[0]):
    for j in range(x.shape[0]):
        # save_stim(x[j], y[j], contrast[i],
        #           '../img/' + str(i * x.shape[0] + j) + '.png')
        stim_key['id'].append(i * x.shape[0] + j)
        stim_key['x'].append(x[j])
        stim_key['y'].append(y[j])
        stim_key['cat'].append(cat[j])
        stim_key['contrast'].append(contrast[i])
stim_key = pd.DataFrame(stim_key)

x = np.concatenate((x1_rot_t, x2_rot_t))
y = np.concatenate((y1_rot_t, y2_rot_t))
cat = np.concatenate((np.ones(n), 2 * np.ones(n)))

position = np.arange(0, n_positions, 1)
r = 1.0
theta = np.linspace(0 + np.pi / 6, 2 * np.pi + np.pi / 6, 6)[0:5]
circle_x = r * np.cos(theta)
circle_y = r * np.sin(theta)
# plt.plot(circle_x, circle_y, '.')
# plt.show()

stim_id = stim_key[(stim_key['cat'] != -1) &
                   (stim_key['contrast'] == np.median(contrast))]['id'].values

distract_id = stim_key[(stim_key['cat'] == -1) & (
    stim_key['contrast'] != np.median(contrast))]['id'].values
distract_id = np.reshape(distract_id, (4, 4))

contrast_selector = np.arange(0, 4, 1)

trial_config = {'stim_id': [], 'target': [], 'cat': [], 'position': []}
for i in range(n_targets):
    for j in range(n_reps):
        np.random.shuffle(stim_id)
        cat = stim_key['cat'][stim_id].values

        for k in range(n_stim_per_rep):
            np.random.shuffle(distract_id)
            np.random.shuffle(position)
            np.random.shuffle(contrast_selector)

            trial_config['stim_id'].append(
                np.append(stim_id[k],
                          distract_id[contrast_selector, [0, 1, 2, 3]]))

            trial_config['position'].append([(circle_x[ii], circle_y[ii])
                                             for ii in position])
            trial_config['target'].append(
                np.append(1, np.zeros(distract_id.shape[0], dtype=np.int8)))
            trial_config['cat'].append(cat[k])

trial_config = pd.DataFrame(trial_config)
trial_config['trial'] = trial_config.index.values

stim_key.to_json('../config/stim_key.json', orient='records')
trial_config.to_json('../config/trial_config.json', orient='records')
