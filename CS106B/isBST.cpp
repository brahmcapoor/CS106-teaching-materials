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

bool isBSTHelper(TreeNode *root, int min, int max) {
  if(root == null) return true;
  if(root->data < min || root->data > max) return false;
  return isBSTHelper(root->left, min, node->data - 1) && isBSTHelper(root->right, node->data + 1, max);
}

bool isBST(TreeNode *root) {
  return isBSTHelper(root, INT_MIN, INT_MAX)
}
