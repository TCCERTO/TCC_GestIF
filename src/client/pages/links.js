import React from 'react'
import Router from 'next/router'

import { setLink } from '~utils/LinkService'
import links from '../links'

const ModuleCube = ({ name, color, id }) => (
  <div
    className="cube"
    style={{ backgroundColor: color || '#222', marginTop: '0px' }}
    onClick={() => {
      setLink(id, name)
      Router.push('/')
    }}
  >
    {name}
  </div>
)

class Links extends React.Component {
  constructor() {
    super()
    this.state = { roles: [] }
  }

  render() {
    return (
      <React.Fragment>
        <div className="cube-container">
          <br />
          <div className="cubes">
            {links.map(m => {
                  return (
                    <ModuleCube
                      key={m.id + m.name}
                      name={m.name}
                      id={m.id}
                      color={m.color}
                    />
                  )
              })}
          </div>
        </div>
        <style jsx global>{`
          .cube-container {
            height: 100vh !important;
            width: 100%;
            flex-direction: column;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cube {
            height: 200px;
            width: 250px;
            display: flex;
            font-weight: bold;
            font-size: 1.5em;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-transform: uppercase;
            cursor: pointer;
            border-radius: 2px;
            border: 2px 2px 0px 0px rgb(0, 0, 0, 0.2);
            transition: ease all 0.3s;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .cubes {
            display: flex;
            flex-direction: row;
          }
          .cube + .cube {
            margin-left: 60px;
          }
          .cube:hover {
            margin-top: -10px;
            box-shadow: 0px 3px 0px 0px rgb(0, 0, 0, 0.2);
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Links