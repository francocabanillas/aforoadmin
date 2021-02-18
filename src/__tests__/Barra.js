import React from 'react';
import { render } from '@testing-library/react';

import Barra from '../components/layouts/Barra'

test('<Barra /> Cargar el formulario y probar que todo este correcto', () => {

    const wrapper = render(<Barra />)
    wrapper.debug
})
