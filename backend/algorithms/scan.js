function scan(requests, head, size, direction) {
    let seek_sequence = [];
    let seek_time = 0;
    
    // Create a copy of requests to avoid modifying original array
    let current_requests = [...requests];
    
    // Add current head position and boundaries to requests
    // Depending on direction, we add 0 or size - 1
    if (direction === 'left') {
        current_requests.push(0);
    } else {
        current_requests.push(size - 1);
    }
    
    // Remove duplicates and sort
    current_requests = [...new Set(current_requests)].sort((a, b) => a - b);
    
    // Find the current head position in the sorted array
    let head_index = 0;
    // We didn't add head to current_requests, we just need to find the split point
    for (let i = 0; i < current_requests.length; i++) {
        if (current_requests[i] >= head) {
            head_index = i;
            break;
        }
    }
    // If head is larger than all elements
    if (head > current_requests[current_requests.length - 1]) {
      head_index = current_requests.length;
    }
    
    let left = current_requests.slice(0, head_index);
    let right = current_requests.slice(head_index);
    
    let current_head = head;
    
    if (direction === 'left') {
        // Go left first, then right
        left.reverse();
        for (let i = 0; i < left.length; i++) {
            seek_sequence.push(left[i]);
            seek_time += Math.abs(current_head - left[i]);
            current_head = left[i];
        }
        for (let i = 0; i < right.length; i++) {
            seek_sequence.push(right[i]);
            seek_time += Math.abs(current_head - right[i]);
            current_head = right[i];
        }
    } else {
        // Go right first, then left
        for (let i = 0; i < right.length; i++) {
            seek_sequence.push(right[i]);
            seek_time += Math.abs(current_head - right[i]);
            current_head = right[i];
        }
        left.reverse();
        for (let i = 0; i < left.length; i++) {
            seek_sequence.push(left[i]);
            seek_time += Math.abs(current_head - left[i]);
            current_head = left[i];
        }
    }
    
    return {
        seek_sequence,
        seek_time,
        algorithm: 'SCAN',
        direction
    };
}

module.exports = scan;
