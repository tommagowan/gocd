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

;(function () { // eslint-disable-line no-extra-semi
  "use strict";

  const m = require("mithril");
  const f = require("helpers/form_helper");

  const AddNotificationFilterWidget = {
    oninit(vnode) {
      const filtersModel = vnode.attrs.filtersModel,
        pipelinesModel   = vnode.attrs.pipelinesModel;

      this.onreset = function onreset(e) { // don't preventDefault() here; still want the native behavior too!
        filtersModel.reset();
        pipelinesModel.reset();
        e.currentTarget.querySelector("input[type='checkbox']").setAttribute("checked", filtersModel.myCommits());
      };

      filtersModel.load();
    },

    view(vnode) {
      const filtersModel = vnode.attrs.filtersModel,
        pipelinesModel   = vnode.attrs.pipelinesModel;

      return m("form", {class: "create-notification-filter", onsubmit: filtersModel.save, onreset: this.onreset},
        m(f.select, {
          label:    "Pipeline",
          name:     "pipeline",
          items:    pipelinesModel.pipelines,
          onchange: m.withAttr("value", pipelinesModel.currentPipeline)
        }),
        m(f.select, {label: "Stage", name: "stage", items: pipelinesModel.stages}),
        m(f.select, {label: "Event", name: "event", items: pipelinesModel.events}),
        m(f.checkbox, {label: "Only if it contains my check-ins", name: "myCheckin", checked: filtersModel.myCommits(), onchange: m.withAttr("checked", filtersModel.myCommits)}),
        m("fieldset",
          m("input", {type: "submit", value: "Add", class: "primary"}),
          m("input", {type: "reset", value: "Reset"})
        )
      );
    }
  };

  module.exports = AddNotificationFilterWidget;
})();

