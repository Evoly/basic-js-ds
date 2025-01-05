const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(val) {  

    const addChild = (node, val) => {
      if (!node) return new Node(val);
      if (node.data === val) return node;
      
      if (val < node.data) {
        node.left = addChild(node.left, val);
      } else {
        node.right = addChild(node.right, val);
      }
      return node;
    };
    this.tree = addChild(this.tree, val);
  }

  has(val) {
    const search = (node, val) => {
      if (!node) return false;
      if (node.data === val) return true;

      return val < node.data ? search(node.left, val) : search(node.right, val);
    };
    return search(this.tree, val)
  }

  find(val) {
    const search = (node, val) => {
      if (!node) return null;
      if (node.data === val) return node;

      return val < node.data ? search(node.left, val) : search(node.right, val);
    };
    return search(this.tree, val)
  }

  remove = (val) =>  {
    const removeNode = (node, val) => {
      if (!node) return null;

      if (val < node.data) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.data) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);

        return node;

      }
    }
  
    this.tree = removeNode(this.tree, val);
  }

  min() {
    const search = (node, min) => {
      if (!node) return min;
      if (node.data < min) {
        min = node.data;
      };

      return search(node.left, min);
    };
    return search(this.tree, this.tree.data);
  }
  
  max() {
    const search = (node, max) => {
      if (!node) return max;
      if (node.data > max) {
        max = node.data;
      };

      return search(node.right, max);
    };
    return search(this.tree, null);
  }
}

module.exports = {
  BinarySearchTree
};