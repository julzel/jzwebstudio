import * as React from 'react';
import Recipes from './Recipes';
//import { useMobile } from '../../hooks/useMobile';

const MyKitchen = () => {
  //const isMobile = useMobile();

  return (
    <div className="kitchen">
      <div>
        <Recipes />
      </div>
    </div>
  );
};

export default MyKitchen;
