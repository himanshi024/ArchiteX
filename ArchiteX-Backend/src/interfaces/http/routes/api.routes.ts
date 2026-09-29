import { Router } from "express";
import { nodeTypes } from "../constants/nodeTypes";
import { edgeTypes } from "../constants/edgeTypes";

const router = Router();

router.get("/node-types", (req, res) => {
  res.json({ nodeTypes });
});

router.get("/edge-types", (req, res) => {
  res.json({ edgeTypes });
});

router.post("/validate", (req, res) => {
  try {
    const payload = req.body;
    res.send({ violations: [] });
  }
  catch (error) {
    res.status(422).send({ error: "Simulation failed" });
  }
})

export default router;



// res.json(nodeTypes) (Direct Data)



// This sends nodeTypes directly as the root of the JSON payload.

// JSON Response Output:
// json
// [
//   { "id": "server", ... },
//   { "id": "database", ... }
// ]
// Frontend Access:
// ts
// const data = await response.json();
// console.log(data); // Array is at the root level directly





// WHEREAS res.json({ nodeTypes }) (Object Wrapper)



// This uses ES6 object shorthand for { nodeTypes: nodeTypes }.

// JSON Response Output:
// json
// {
//   "nodeTypes": [
//     { "id": "server", ... },
//     { "id": "database", ... }
//   ]
// }
// Frontend Access:
// ts
// const data = await response.json();
// console.log(data.nodeType