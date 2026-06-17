function cscan(requests, head, size, direction) {
    let seek_sequence = [];
    let seek_time = 0;
    
    // Create a copy of requests
    let current_requests = [...requests];
    
    // In C-SCAN, we always add both boundaries 0 and size-1
    current_requests.push(0);
    current_requests.push(size - 1);
    
    // Remove duplicates and sort
    current_requests = [...new Set(current_requests)].sort((a, b) => a - b);
    
    // Find split point
    let head_index = 0;
    for (let i = 0; i < current_requests.length; i++) {
        if (current_requests[i] >= head) {
            head_index = i;
            break;
        }
    }
    if (head > current_requests[current_requests.length - 1]) {
      head_index = current_requests.length;
    }
    
    let left = current_requests.slice(0, head_index);
    let right = current_requests.slice(head_index);
    
    let current_head = head;
    
    if (direction === 'right') {
        // Go right, jump to beginning, continue right
        for (let i = 0; i < right.length; i++) {
            seek_sequence.push(right[i]);
            seek_time += Math.abs(current_head - right[i]);
            current_head = right[i];
        }
        // Jump to 0
        if (left.length > 0) {
            current_head = 0;
            // The jump time is usually counted, or not. Standard C-SCAN counts it.
            // Wait, does C-SCAN count jump? Usually yes, seek_time += size - 1. 
            // In typical OS problems, jump is counted.
            seek_time += Math.abs((size - 1) - 0);
            
            for (let i = 0; i < left.length; i++) {
                seek_sequence.push(left[i]);
                seek_time += Math.abs(current_head - left[i]);
                current_head = left[i];
            }
        }
    } else {
        // Go left, jump to end, continue left
        left.reverse();
        for (let i = 0; i < left.length; i++) {
            seek_sequence.push(left[i]);
            seek_time += Math.abs(current_head - left[i]);
            current_head = left[i];
        }
        // Jump to size - 1
        if (right.length > 0) {
            current_head = size - 1;
            seek_time += Math.abs((size - 1) - 0);
            
            right.reverse();
            for (let i = 0; i < right.length; i++) {
                seek_sequence.push(right[i]);
                seek_time += Math.abs(current_head - right[i]);
                current_head = right[i];
            }
        }
    }
    
    return {
        seek_sequence,
        seek_time,
        algorithm: 'C-SCAN',
        direction
    };
}

module.exports = cscan;
