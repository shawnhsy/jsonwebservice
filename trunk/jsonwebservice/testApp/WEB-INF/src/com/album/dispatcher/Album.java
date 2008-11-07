
package com.album.dispatcher;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;
import org.w3._2005.atom.Crediential;
import org.w3._2005.atom.FeedType;
import org.w3._2005.atom.LoginParameter;
import org.w3._2005.atom.LoginResponse;
import org.w3._2005.atom.ObjectFactory;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.1.5-hudson-$BUILD_NUMBER-
 * Generated source version: 2.1
 * 
 */
@WebService(name = "Album", targetNamespace = "http://album.com/dispatcher")
@SOAPBinding(style = SOAPBinding.Style.RPC)
@XmlSeeAlso({
    ObjectFactory.class
})
public interface Album {


    /**
     * 
     * @param requestcontext
     * @return
     *     returns org.w3._2005.atom.LoginResponse
     * @throws ClientLoginFault
     */
    @WebMethod(action = "http://code.google.com/p/jsonwebservice/album")
    @WebResult(name = "requestcontext", partName = "requestcontext")
    public LoginResponse clientLogin(
        @WebParam(name = "requestcontext", partName = "requestcontext")
        LoginParameter requestcontext)
        throws ClientLoginFault
    ;

    /**
     * 
     * @param crediential
     * @return
     *     returns org.w3._2005.atom.FeedType
     */
    @WebMethod(action = "http://code.google.com/p/jsonwebservice/album")
    @WebResult(name = "requestcontext", partName = "requestcontext")
    public FeedType listAlbums(
        @WebParam(name = "crediential", partName = "crediential")
        Crediential crediential);

}
