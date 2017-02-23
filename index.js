const helper = require('think-helper');
const path = require('path');
const config = require('./loader/config.js');
const bootstrap = require('./loader/bootstrap.js');
const view = require('./loader/view.js');
const middleware = require('./loader/middleware.js');
const router = require('./loader/router.js');
const extend = require('./loader/extend.js');
const common = require('./loader/common.js');


/**
 * Loader
 */
class Loader {
  /**
   * constructor
   */
  constructor(appPath, thinkPath){
    this.appPath = appPath;
    this.thinkPath = thinkPath;
    this.isMultiModule = false;
    let dir = path.join(appPath, 'common/config');
    if(helper.isDirectory(dir)){
      this.isMultiModule = true;
    }
  }
  /**
   * load config
   */
  loadConfig(env){
    return config(this.appPath, this.isMultiModule, this.thinkPath, env);
  }
  /**
   * load bootstrap
   */
  loadBootstrap(){
    return bootstrap(this.appPath, this.isMultiModule);
  }
  /**
   * load controller
   */
  loadController(){
    return common(this.appPath, this.isMultiModule, 'controller');
  }
  /**
   * load logic
   */
  loadLogic(){
    return common(this.appPath, this.isMultiModule, 'logic');
  }
  /**
   * load model
   */
  loadModel(){
    return common(this.appPath, this.isMultiModule, 'model');
  }
  /**
   * load service
   */
  loadService(){
    return common(this.appPath, this.isMultiModule, 'service');
  }
  /**
   * load view
   */
  loadView(viewPath){
    return view(viewPath);
  }
  /**
   * load middleware
   */
  loadMiddleware(){
    return middleware(this.appPath, this.isMultiModule, this.thinkPath);
  }
  /**
   * load router
   */
  loadRouter(){
    return router(this.appPath, this.isMultiModule);
  }
  /**
   * load extend
   */
  loadExtend(){
    return extend(this.appPath);
  }
  /**
   * load use defined file
   */
  loadCommon(name){
    return common(this.appPath, this.isMultiModule, name);
  }
}

module.exports = Loader;