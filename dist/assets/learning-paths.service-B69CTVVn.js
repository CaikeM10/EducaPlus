import{a as e}from"./button-CrPIJpzq.js";import{b as n}from"./index-czJRUfzy.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]],c=e("clock-3",t);async function i(a){return(await n.get("/learning-paths/with-progress",{params:a})).data}async function p(a){return(await n.get(`/learning-paths/${a}`)).data}async function g(a,s){await n.post("/learning-paths/progress",{stepId:a,completed:s})}export{c as C,p as g,i as l,g as u};
