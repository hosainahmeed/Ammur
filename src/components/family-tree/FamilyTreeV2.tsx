/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import { useEffect } from 'react';
const FamilyTreeV2 = () => {
  useEffect(() => {
    fetch('/familyData.json')
      .then((res) => res.json())
      .then((data) => {
        create(data);
      })
      .catch((err) => console.error(err));

    function create(data: any) {
      const cont = document.querySelector('div#FamilyChart');
      const store = f3.createStore({
        data,
        node_separation: 250,
        level_separation: 150,
      });
      const svg = f3.createSvg(cont);
      const Card = f3.elements.Card({
        store,
        svg,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5,
        },
        card_display: [
          (d: any) => `${d.data['first name']} ${d.data['last name']}`,
        ],
        mini_tree: true,
        link_break: false,
      });

      store.setOnUpdate((props: any) =>
        f3.view(store.getTree(), svg, Card, props || {})
      );
      store.updateTree({ initial: true });
    }
  }, []);
  return (
    <div
      id="FamilyChart"
      className="f3"
      style={{
        width: '100%',
        height: '900px',
        margin: 'auto',
        // backgroundColor: 'rgb(33, 33, 33)',
        color: '#fff',
      }}
    ></div>
  );
};

export default FamilyTreeV2;
