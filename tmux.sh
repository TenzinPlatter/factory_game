#!/bin/bash

SESSION_NAME="factory"

if tmux has-session -t $SESSION_NAME 2>/dev/null; then
	echo "Session $SESSION_NAME exists, attaching..."
	tmux attach-session -t $SESSION_NAME
else
	tmux new-session -d -s $SESSION_NAME
	
	# main window
	tmux rename-window -t 0 "Code"
	tmux send-keys -t "Code" "nv src" C-m

	tmux new-window -t $SESSION_NAME:1 -n "Git"
	tmux send-keys -t "Git" "lg" C-m

	tmux new-window -t $SESSION_NAME:2 -n "Dev Server"
	tmux send-keys -t "Dev Server" "npm run dev" C-m

	tmux select-window -t 0

	tmux attach-session -t $SESSION_NAME
fi
