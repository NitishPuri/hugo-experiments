const FB = require('./insta')
const TestClass = require('./testModule')

var testModule = new TestClass()
testModule.doStuff()

var fb = new FB();
fb.getFBUser();
fb.getNode(fb.pages.ccStudioId);
fb.getNode(fb.pages.sketchesId);
fb.getNode(fb.insta.printsh);
fb.getNode(fb.insta.sketches);
