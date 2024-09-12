class TreeNode {
  constructor(
    key,
    value = key,
    parent = null,
    parents = parents,
    iconName,
    translatedKey,
    label,
    secondaryKey,
    secondaryLabel,
    url,
    isEnable,
    favorite,
    hideClassic,
    root = null,
  ) {
    this.key = key;
    this.iconName = iconName;
    this.label = label;
    this.secondaryKey = secondaryKey;
    this.secondaryLabel = secondaryLabel;
    this.translatedKey = translatedKey;
    this.url = url;
    this.isEnable = isEnable;
    this.favorite = favorite;
    this.hideClassic = hideClassic;
    this.value = value;
    this.parent = parent;
    this.parents = parents;
    this.children = [];
    this.root = root;
    this.path = parent ? [...parent.path, key] : [key];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(
    key,
    value = key,
    parentKey = null,
    parents,
    iconName,
    translatedKey,
    label,
    secondaryKey,
    secondaryLabel,
    url,
    isEnable,
    favorite,
    hideClassic,
  ) {
    const newNode = new TreeNode(
      key,
      value,
      null,
      parents,
      iconName,
      translatedKey,
      label,
      secondaryKey,
      secondaryLabel,
      url,
      isEnable,
      favorite,
      hideClassic,
    );
    if (parentKey === null) {
      if (this.root === null) {
        this.root = newNode;
        newNode.root = newNode;
        newNode.path = [key];
      }
    } else {
      const parent = this.findNode(this.root, parentKey);
      if (parent) {
        newNode.parent = parent;
        newNode.root = this.root;
        newNode.path = [...parent.path, key];
        parent.children.push(newNode);
      }
    }
  }

  findNode(node, key) {
    if (node === null) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    for (const child of node.children) {
      const result = this.findNode(child, key);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }

  generateTree(data, parentKey = null) {
    this.insert(
      data.key,
      data.key,
      parentKey,
      data.parents,
      data.iconName,
      data.translatedKey,
      data.label,
      data.secondaryKey,
      data.secondaryLabel,
      data.url,
      data.isEnable,
      data.favorite,
      data.hideClassic,
    );
    if (data.children) {
      for (const child of data.children) {
        this.generateTree(child, data.key);
      }
    }
  }

  getPathToNode(key) {
    const path = [];
    const findPath = (node) => {
      if (node.key === key) {
        path.push(node.key);
        return true;
      }
      for (const child of node.children) {
        if (findPath(child)) {
          path.push(node.key);
          return true;
        }
      }
      return false;
    };
    findPath(this.root);
    return path.reverse();
  }
}

export { Tree, TreeNode };
