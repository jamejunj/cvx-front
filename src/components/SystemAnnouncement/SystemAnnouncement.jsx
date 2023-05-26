import React from 'react'
import Flickity from 'react-flickity-component'

function SystemAnnouncement() {
  const images = [
    'banners/1.jpg',
    'banners/2.jpg',
  ]
  const flickityOptions = {
    draggable: true,
    wrapAround: true,
    autoPlay: 3000, 
    pageDots: true,
    prevNextButtons: true,
  }
  return (
    // <div cv-semantic="system-announcement" className="overflow-hidden h-64 object-cover mt-2 rounded-lg">
    //     <img className="block" src="https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/293260156_5569627523081883_4373664362630121500_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGvXNDaF7FHJZmfwQqCx3BHzmC499cSR_vOYLj31xJH-6xq2FnERDdSiP-o_AAknVwhW82PsXBgYPg7IngLoHmf&_nc_ohc=dvXExv3WekwAX_keVZj&_nc_ht=scontent.fbkk9-2.fna&oh=00_AfBt8G1Y5-zW0RkXkRjeuN5lNUxQlz9CJWU8Ykf818KfmA&oe=63DACDDB" alt="system annoucement" />
    // </div>
    <Flickity
      className={'outline-none mb-8'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {images.map((image, index) => (
        <img key={index} className="object-cover w-full h-48 md:h-64" src={image} alt="Image" />
      ))}
    </Flickity>
  )
}

export default SystemAnnouncement