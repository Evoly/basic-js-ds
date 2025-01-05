const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */

class Queue {
  constructor() {
    this.list = null;
    this.last = null;
  }
  getUnderlyingList() {
    return this.list;
  }

  enqueue(val) {
    const el = new ListNode(val);
    if (!this.list) {
      this.list = el;
      this.last = el;
    } else {
      this.last.next = el; // 
      this.last = el
    }
  }

  dequeue() {
    const firstEl = this.list.value;
    this.list = this.list.next;
    return firstEl;
  }
}

module.exports = {
  Queue
};


/*
In your code, the head of the queue is not explicitly updated after the line this.tail.next = node;. The key point here is that this.head is already pointing to the first node of the queue and does not need to be changed when new elements are enqueued. Here's a detailed breakdown of the logic:

    Queue Structure:
        this.head: Points to the first node in the queue.
        this.tail: Points to the last node in the queue.
        Each node is a ListNode object with a value and a next pointer, which points to the next node in the list.

    When a new element is enqueued (enqueue method):
        A new node is created with the given val (using new ListNode(val)).
        If the queue already has nodes (this.head is not null), the newly created node is added after the current tail:
            this.tail.next = node: This sets the next pointer of the current tail node to point to the new node, essentially linking the old tail to the new node.
            this.tail = node: This updates the tail pointer to refer to the new node, making it the last node in the queue.

    Why this.head does not change:
        The this.head always points to the first node in the queue. In the case of a queue, this does not need to be modified when enqueuing elements because:
            If the queue is empty, both this.head and this.tail will point to the same node (the first and only node in the queue).
            If the queue already has nodes, this.head still points to the first node, and only the tail pointer changes to reflect the new last node.
        Therefore, even though this.tail.next is updated to point to the new node, this.head remains unchanged because it is still pointing to the first node in the queue.

To summarize, this.head does not need to be updated because it already points to the first node, and the only part that changes when enqueuing is the tail and the link between the current tail and the new node.
*/