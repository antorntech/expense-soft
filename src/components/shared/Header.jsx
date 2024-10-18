const Header = () => (
  <div className="flex items-center justify-between bg-gray-200 px-5 py-3 rounded-md">
    <div>
      <img src="./logo.png" alt="" />
    </div>
    <div>
      <ul className="flex items-center gap-5">
        <li>HOME</li>
        <li>ABOUT</li>
        <li>CONTACT</li>
      </ul>
    </div>
    <button className="bg-[#425194] text-white px-4 py-2 rounded-md">
      Get App
    </button>
  </div>
);

export default Header;
