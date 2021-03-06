/*
 * Copyright 2017 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const $                 = require('jquery');
const m                 = require('mithril');
const Stream            = require('mithril/stream');
const AuthConfigsWidget = require('views/auth_configs/auth_configs_widget');
const PluginInfos       = require('models/shared/plugin_infos');

$(() => {
  const onSuccess = function (pluginInfos) {
    const component = {
      view () {
        return m(AuthConfigsWidget, {
          pluginInfos: Stream(pluginInfos)
        });
      }
    };

    m.mount($("#auth-configs").get(0), component);
  };

  const onFailure = function () {
    $("#auth-configs").html($('<div class="alert callout">')
      .append('<h5>There was a problem fetching the auth configs</h5>')
      .append('<p>Refresh <a href="javascript: window.location.reload()">this page</a> in some time, and if the problem persists, check the server logs.</p>')
    );
  };

  PluginInfos.all(null, {type: 'authorization'}).then(onSuccess, onFailure);
});
