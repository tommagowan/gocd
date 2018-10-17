/*
 * Copyright 2018 ThoughtWorks, Inc.
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

import * as m from 'mithril';
import * as styles from './index.scss';

declare global  {
  module JSX {
      interface Element extends m.Vnode<any, any> {
      }
      interface IntrinsicElements {
          [elementName: string]: any;
      }
      interface ElementAttributesProperty {
          __tsx_attrs: any;
      }
  }
}

export interface Attrs {
	id: string
}

export default class HelloWorld implements m.ClassComponent<Attrs> {
  view(vnode: m.Vnode<Attrs>) {
    return (
      <div class={styles.helloWorldFoo}>
        Hello world, Your name is {vnode.attrs.id}!
      </div>
    );
  }
}
