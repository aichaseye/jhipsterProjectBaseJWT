package mfpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mfpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NomLycetechTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NomLycetech.class);
        NomLycetech nomLycetech1 = new NomLycetech();
        nomLycetech1.setId(1L);
        NomLycetech nomLycetech2 = new NomLycetech();
        nomLycetech2.setId(nomLycetech1.getId());
        assertThat(nomLycetech1).isEqualTo(nomLycetech2);
        nomLycetech2.setId(2L);
        assertThat(nomLycetech1).isNotEqualTo(nomLycetech2);
        nomLycetech1.setId(null);
        assertThat(nomLycetech1).isNotEqualTo(nomLycetech2);
    }
}
