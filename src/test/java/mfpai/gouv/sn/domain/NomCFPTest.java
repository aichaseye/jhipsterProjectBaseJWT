package mfpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mfpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NomCFPTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NomCFP.class);
        NomCFP nomCFP1 = new NomCFP();
        nomCFP1.setId(1L);
        NomCFP nomCFP2 = new NomCFP();
        nomCFP2.setId(nomCFP1.getId());
        assertThat(nomCFP1).isEqualTo(nomCFP2);
        nomCFP2.setId(2L);
        assertThat(nomCFP1).isNotEqualTo(nomCFP2);
        nomCFP1.setId(null);
        assertThat(nomCFP1).isNotEqualTo(nomCFP2);
    }
}
