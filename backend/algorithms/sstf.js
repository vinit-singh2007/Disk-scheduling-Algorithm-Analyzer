function sstf(requests, head) {
    let seek_sequence = [];
    let seek_time = 0;
    
    // Create a copy of requests to avoid modifying original array
    let current_requests = [...requests];
    let current_head = parseInt(head);
    
    while (current_requests.length > 0) {
        let min_distance = Infinity;
        let closest_index = -1;
        
        // Find the closest request to current_head
        for (let i = 0; i < current_requests.length; i++) {
            let distance = Math.abs(current_head - current_requests[i]);
            if (distance < min_distance) {
                min_distance = distance;
                closest_index = i;
            }
        }
        
        // Process the closest request
        let next_head = current_requests[closest_index];
        seek_sequence.push(next_head);
        seek_time += min_distance;
        current_head = next_head;
        
        // Remove the processed request
        current_requests.splice(closest_index, 1);
    }
    
    return {
        seek_sequence,
        seek_time,
        algorithm: 'SSTF'
    };
}

module.exports = sstf;
