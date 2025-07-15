import { AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../components';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <section className="home">
          <header>
            <img 
              src='./threejs.png'
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </header>

          <div className="home-content">
            <div>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT.
              </h1>
            </div>
            <div
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
              Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
              </p>

              <div className="flex gap-4">
                <CustomButton
                  type="filled"
                  title="T-Shirt"
                  handleClick={() => {
                    state.activeItem = 'shirt';
                    state.intro = false;
                  }}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
                <CustomButton
                  type="filled"
                  title="T-Shirt 2"
                  handleClick={() => {
                    state.activeItem = 'shirt2';
                    state.intro = false;
                  }}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
                <CustomButton
                  type="filled"
                  title="Hoodie"
                  handleClick={() => {
                    state.activeItem = 'hoodie';
                    state.intro = false;
                  }}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </AnimatePresence>
  )
}

export default Home