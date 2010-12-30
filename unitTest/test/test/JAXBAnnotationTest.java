package test;

import java.io.IOException;
import java.net.MalformedURLException;

public class JAXBAnnotationTest extends JSONCodecTest /*implements
		com.test.jsonwebservice.rpc.JAXBAnnotationTest*/ {

	protected void setUp() throws Exception {
		END_POINT = "http://localhost:8080/unitTest/json/jaxbannotation";
		super.setUp();
	}
	
	public void test1EmptyInXmlElementsOut() throws MalformedURLException, IOException {
		String in 	= "{\"test1EmptyInXmlElementsOut\":{}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}]," +
				"\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1,\"String\":\"SS\"}]," +
				"\"object\":[{\"property1\":1},{\"property1\":2}]}}";
		assertEquals(out, expected);
	}

	public void test2XmlElementsInEmptyOut() throws MalformedURLException, IOException {
		String in 	= "{\"test2XmlElementsInEmptyOut\":{\"xmlElementsObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}]," +
				"\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1,\"String\":\"SS\"}]," +
				"\"object\":[{\"property1\":1},{\"property1\":2}]}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);
	}

	public void test3XmlElementsInXmlElementsOut() throws MalformedURLException, IOException {
		String in 	= "{\"test3XmlElementsInXmlElementsOut\":{\"xmlElementsObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}]," +
		"\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1},{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":2.2,\"int\":22}]," +
		"\"object\":[{\"property1\":1},{\"property1\":2},{\"property1\":3}]}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true," +
				"\"xmlElementsObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}]," +
		"\"object\":[{\"property1\":1},{\"property1\":2},{\"property1\":3}]," +
		"\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1},{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":2.2,\"int\":22}]}}";
		assertEquals(out, expected);
	}

	public void test4EmptyInXmlElementsWrapOut() throws MalformedURLException, IOException {
		String in 	= "{\"test4EmptyInXmlElementsWrapOut\":{}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsWrapperObj\":{\"choiceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1,\"String\":\"SS\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}";
		assertEquals(out, expected);
	}

	public void test5XmlElementsWrapInEmptyOut() throws MalformedURLException, IOException {
		String in 	= "{\"test5XmlElementsWrapInEmptyOut\":{\"xmlElementsWrapperObj\":{\"choiceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1,\"String\":\"SS\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);
	}

	public void test6XmlElmWrapInXmlElmWrapOut() throws MalformedURLException, IOException {
		String in 	= "{\"test6XmlElmWrapInXmlElmWrapOut\":{\"xmlElementsWrapperObj\":{\"choiceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1,\"String\":\"DD\"},{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":2.2,\"int\":22,\"String\":\"FF\"}],\"object\":[{\"property1\":1},{\"property1\":2},{\"property1\":3}]}}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsWrapperObj\":{\"choiceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"KK\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"DD\"}],\"object\":[{\"property1\":1},{\"property1\":2},{\"property1\":3}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_2\",\"float\":1.2,\"int\":1,\"String\":\"DD\"},{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":2.2,\"int\":22,\"String\":\"FF\"}]}}}";
		assertEquals(out, expected);
	}

	public void test7EmptyInXmlElementsSeqOut() throws MalformedURLException, IOException {
		String in 	= "{\"test7EmptyInXmlElementsSeqOut\":{}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsSeqObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"tt77\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"rr\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}";
		assertEquals(out, expected);
	}

	public void test8XmlElementsSeqInEmptyOut() throws MalformedURLException, IOException {
		String in 	= "{\"test8XmlElementsSeqInEmptyOut\":{\"xmlElementsSeqObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"tt77\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"rr\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);
	}

	public void test9XmlElementsSeqInXmlElementsSeqOut() throws MalformedURLException, IOException {
		String in 	= "{\"test9XmlElementsSeqInXmlElementsSeqOut\":{\"xmlElementsSeqObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"tt77\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"rr\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsSeqObj\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"tt77\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"object\":[{\"property1\":1},{\"property1\":2}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"rr\"}]}}";
		assertEquals(out, expected);
	}
	
	public void test10EmptyInXmlElementsSeqWrapOut() throws MalformedURLException, IOException {
		String in 	= "{\"test10EmptyInXmlElementsSeqWrapOut\":{}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsSeqWrapperObj\":{\"sequenceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"FF\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"DD\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}";
		assertEquals(out, expected);
	}

	public void test11XmlElementsSeqWrapInEmptyOut() throws MalformedURLException, IOException {
		String in 	= "{\"test11XmlElementsSeqWrapInEmptyOut\":{\"xmlElementsSeqWrapperObj\":{\"sequenceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"FF\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"DD\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);

	}

	public void test12XmlElmWrapSeqInXmlElmSeqWrapOut() throws MalformedURLException, IOException {
		String in 	= "{\"test12XmlElmWrapSeqInXmlElmSeqWrapOut\":{\"xmlElementsSeqWrapperObj\":{\"sequenceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"FF\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"DD\"}],\"object\":[{\"property1\":1},{\"property1\":2}]}}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true,\"xmlElementsSeqWrapperObj\":{\"sequenceList\":{\"mapObject\":[{\"keyProperty1\":1,\"keyProperty2\":\"FF\",\"property1\":true,\"valueProperty1\":2,\"valueProperty2\":\"FF\"}],\"object\":[{\"property1\":1},{\"property1\":2}],\"objectReserved\":[{\"boolean\":true,\"enum\":\"CONST_1\",\"float\":1.2,\"int\":1,\"String\":\"DD\"}]}}}";
		assertEquals(out, expected);
	}

	public void test13EmptyInXmlElementRefsOut() throws MalformedURLException, IOException {
		String in 	= "{\"test13EmptyInXmlElementRefsOut\":{}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);
		// THIS is not supported type
	}

	public void test14XmlElementRefsInEmptyOut() throws MalformedURLException, IOException {
		String in 	= "{\"test14XmlElementRefsInEmptyOut\":{\"xmlElementRefsObj\":{}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);
		// THIS is not supported type
	}

	public void test15XmlElementRefsInXmlElementRefsOut() throws MalformedURLException, IOException {
		String in 	= "{\"test15XmlElementRefsInXmlElementRefsOut\":{\"xmlElementRefsObj\":{}}}";
		System.out.println("IN: " + in);
		String out 		= postOnEndPoint(in);
		System.out.println("OUT: " + out);
		String expected 	= "{\"statusFlag\":true}";
		assertEquals(out, expected);
		// THIS is not supported type
	}
}
