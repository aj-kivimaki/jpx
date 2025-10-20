const Info = () => {
  return (
    <div id="info" className="section info">
      <div>
        <h2>BÄNDI</h2>
        <p>Visa Ruokolainen, basso</p>
        <p>Olli Tanttu, kitara</p>
        <p>Jani Partinen, laulu & kitara</p>
        <p>Touko Ruokolainen, rummut</p>
        <p>Atte Kivimäki, koskettimet</p>
      </div>
      <div>
        <img
          src="/images/j-partynen-bandikuva.jpg"
          width={450}
          height={450}
          alt="Banner"
          className="bändikuva"
        />
      </div>
    </div>
  );
};

export default Info;
