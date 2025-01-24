#!/bin/bash

SESSION_NAME="factory"

if tmux has-session -t $SESSION_NAME 2>/dev/null; then
	echo "Session $SESSION_NAME exists, attaching..."
	tmux attach-session -t $SESSION_NAME
else
	tmux new-session -d -s $SESSION_NAME
	
	# main window
	tmux rename-window -t 0 "code"
	tmux send-keys -t "code" "nv src" C-m

	tmux new-window -t $SESSION_NAME:1 -n "git"
	tmux send-keys -t "git" "lg" C-m

	tmux new-window -t $SESSION_NAME:2 -n "dev server"
	tmux send-keys -t "dev server" "npm run dev" C-m

	tmux new-window -t $SESSION_NAME:3 -n "shell"

	tmux select-window -t 0

	tmux attach-session -t $SESSION_NAME
fi
