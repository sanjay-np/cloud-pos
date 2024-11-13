#!/bin/bash
# dev.sh

# Start npm run dev in the background
npm run dev &

# Store the npm process ID
NPM_PID=$!

# Start php artisan serve
php artisan serve &

# Store the artisan process ID
ARTISAN_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down development servers..."
    kill $NPM_PID
    kill $ARTISAN_PID
    exit
}

# Set up trap to catch termination signal
trap cleanup SIGINT SIGTERM

# Keep the script running
wait
