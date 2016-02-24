
import { combineReducers } from 'redux';

const initialState = {
    particles: [],
    particleIndex: 0,
    svgWidth: 800,
    svgHeight: 600,
    tickerStarted: false,
    generateParticles: false,
    mousePos: [null, null]
};

function particlesApp(state = initialState, action) {
    switch (action.type) {
        case 'TICKER_STARTED':
            return Object.assign({}, state, {
                tickerStarted: true
            });
        case 'START_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: true
            });
        case 'STOP_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: false
            });
        case 'CREATE_PARTICLE':
            let newParticles = state.particles.slice(0),
                particle = action.particle;

            particle.vector = [particle.id%2 ? -1 : 1,
                               1];

            newParticles.unshift(action.particle);

            return Object.assign({}, state, {
                particles: newParticles,
                particleIndex: state.particleIndex+1
            });
        case 'UPDATE_MOUSE_POS':
            return Object.assign({}, state, {
                mousePos: [action.x, action.y]
            });
        case 'TIME_TICK':
            let movedParticles = state.particles.map((p) => {
                let [vx, vy] = p.vector;
                p.x += vx;
                p.y += vy;
                return p;
            });
            return Object.assign({}, state, {
                particles: movedParticles
            });
        default:
            return state;
    }
}

export default particlesApp;
