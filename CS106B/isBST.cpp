/*
 * A function that -- given the root of a tree -- returns a boolean
 * indicating whether the tree is a binary search tree.
 *
 * INT_MIN and INT_MAX are defined for you by C++ . 
 */


struct TreeNode {
  int data;
  TreeNode *left;
  TreeNode *right;
};

bool isBSTHelper(TreeNode *node, int min, int max) {
  if(node == null) return true;
  if(node->data < min || node->data > max) return false;
  return isBSTHelper(node->left, min, node->data - 1) && isBSTHelper(node->right, node->data + 1, max);
}

bool isBST(TreeNode *root) {
  return isBSTHelper(root, INT_MIN, INT_MAX)
}
