/**
*
* Copyright 2016 Google Inc. All rights reserved.
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
import { h } from 'preact';
import BoundComponent from './bound-component';

export class Login extends BoundComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form action="/login" method="POST"><button>Log in</button></form>
    );
  }
}

export class Logout extends BoundComponent {
  constructor(props) {
    super(props);
    this.logoutUrl = '/logout';
  }
  onSubmit(event) {
    event.preventDefault();

    fetch(this.logoutUrl + '.json', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      this.props.onLogout();
    });
  }
  render(props, state) {
    return ( 
      <form action={this.logoutUrl} method="POST" onSubmit={this.onSubmit}>
        <button>Log out</button>
      </form>
    );
  }
}

Logout.defaultProps = {
  onLogout: function(){}
};

export class Agree extends BoundComponent {
  constructor(props) {
    super(props);
    this.agreeUrl = '/agree';
  }
  async onSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(this.agreeUrl + '.json', {
        credentials: 'include',
        method: 'POST'
      });
      const data = await response.json();

      if (data.err) throw Error(err);
      this.props.onAgree(data.user);
    }
    catch (err) {
      throw err;
    }
  }
  render() {
    return (
      <form action={this.agreeUrl} method="POST" onSubmit={this.onSubmit}>
        <p>For privacy reasons, you must be 13 or older to play.</p>
        <div><button>I am 13 or older</button></div>
      </form>
    );
  }
}

Agree.defaultProps = {
  onAgree: function(){}
};