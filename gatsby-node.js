const crypto = require("crypto");

const data = [
  {
    id: 1,
    content: "First",
    related: [2, 4],
  },
  {
    id: 2,
    content: "Second",
    related: [1],
  },
  {
    id: 3,
    content: "Third",
    related: [4],
  },
  {
    id: 4,
    content: "Fourth",
    related: [1, 2, 3],
  },
];

exports.sourceNodes = ({ actions, createNodeId }) => {
  const { createNode } = actions;

  data.map(product => {
    const content = {
      content: product.content,
      ["related___NODE"]: product.related.map(id =>
        createNodeId(`Product{${id}}`),
      ),
    };

    const id = createNodeId(`Product{${product.id}}`);

    const nodeContent = JSON.stringify(content);
    createNode({
      ...content,
      id,
      parent: null,
      children: [],
      internal: {
        type: `Product`,
        content: nodeContent,
        contentDigest: crypto
          .createHash("md5")
          .update(nodeContent)
          .digest("hex"),
      },
    });
  });
};
