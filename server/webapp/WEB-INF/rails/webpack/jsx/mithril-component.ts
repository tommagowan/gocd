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

import * as m from 'mithril'

export abstract class MithrilComponent<A> implements m.ClassComponent<A> {

  // Required for type checking JSX attributes
  // @ts-ignore: unused
  private __tsx_attrs: A & m.Lifecycle<A, this> & { key?: string | number };

  // Copy of m.ClassComponent<A>.view required by TS
  abstract view(vnode: m.Vnode<A, this>): m.Children | null | void;
}

// Set up type checks
declare global {
  module JSX {
    // Return type for elements
    interface Element extends m.Vnode<any, any> {

    }

    // Element names allowed – with attributes allowed
    interface IntrinsicElements {
      [elementName: string]: any
    }

    // Where to look for component type information
    interface ElementAttributesProperty {
      __tsx_attrs: any
    }
  }

}
