import {Contact} from './Contact/Contact';
import {Information} from './Information/Information';
import {PayInformation} from './PayInformation/PayInformation';
import '../../../style/Footer.css';

export function Footer() {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <Information />
        <PayInformation />
        <Contact />
      </div>
    </footer>
  );
}
