///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'jimu/BaseWidget',
  'jimu/utils',
  'jimu/LayerStructure',
  './libs/widget-notifications/notifications'
],  
function(declare, lang, BaseWidget, utils, LayerStructure, WidgetNotifications) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    
    baseClass: 'jimu-widget-widget',
    layerStructure: LayerStructure.getInstance(), // Get info about layers in map
    notification: new WidgetNotifications(),

    postCreate: function() {
      console.log('onPostCreate')
      this.inherited(arguments)
    },

    startup: function() {
      console.log('onStartUp')
      this.inherited(arguments)

      // Get the correct url for external style sheets both in dev and prod
      let folderUrl = this.folderUrl
      if (folderUrl.includes('webappbuilder/stemapp')) {
        folderUrl = folderUrl.substr(folderUrl.indexOf('widgets'))
      }
      
      // Loading external style sheet
      utils.loadStyleLink('WidgetNotifications', folderUrl + 'libs/widget-notifications/style.css')
      
      // Use lang.hitch to get access to this in other functions e.g. event handlers
      document.querySelector('#my-checkbox')
      .addEventListener('change', lang.hitch(this, this._handleCheckboxChange))

    },

    onOpen: function() {
      console.log('onOpen')
      document.querySelector('#widget-notifications').innerHTML = '' // Delete old notifications
     
      },

    onClose: function() {
      console.log('onClose')
    },

    onMinimize: function(){
      console.log('onMinimize')
    },

    onMaximize: function(){
      console.log('onMaximize')
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn')
    },

    onSignOut: function(){
      console.log('onSignOut')
    },

    _handleCheckboxChange: function(param) {
     // Do not use fat arrow functions for class methods.
     let status =  document.querySelector('#my-checkbox').checked
     let msg = status ? 'aktivert' : 'deaktivert' 
     alert(`Denne widgeten er ${msg} og har url ${this.folderUrl}`)
    }
  })
})